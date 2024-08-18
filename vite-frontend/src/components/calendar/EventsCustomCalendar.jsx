import { useState, useEffect, useMemo } from 'react';
import { Calendar } from '@mantine/dates';
import { ActionIcon, Anchor, Group, Indicator, Modal, Paper, Stack, Text, Title } from '@mantine/core';
import { getTheme } from '../../configs/appfunctions';
import { IconChevronRight, IconCalendar } from '@tabler/icons';
import bodyStyles from '../styles/bodyStyles';
import { Link } from 'react-router-dom';
import React from 'react';

export default function EventsCustomCalendar(props) {

  const { custom, allowdatechange } = props

  const { theme, classes } = bodyStyles()

  const [date_, setDate] = useState(new Date());
  const [data, setData] = useState([])
  let [days, setDays] = useState([])

  const [modalOPen, setModalOpen] = useState(false)
  const [targetDate, setTargetDate] = useState(new Date())

  const getEvents = () => {
  }

  const getDaysToMark = () => {
    let ds = []
    data.map((e) => {
      ds.push(e.day)
    })
    setDays(ds)
  }

  const filterEventsOnDate = () => {
    return data.filter((e) => e.day === targetDate?.getDate())
  }

  useEffect(() => {
    getDaysToMark()
  }, [data])

  const whatToWatch = useMemo(() => {
    let yr = date_?.getFullYear()
    let mo = date_?.getMonth()
    return {
      yr, mo
    }
  }, [date_])

  useEffect(() => {
    getEvents()
  }, [whatToWatch])

  return (
    <Paper p="xs" radius="lg">
      <Modal overflow='inside'
        transition="scale-y" transitionDuration={500}
        size="lg" title={`Events on this date - ${targetDate?.toDateString()}`}
        overlayBlur={2}
        overlayOpacity={0.3}
        shadow="xl"
        opened={modalOPen} radius="lg" styles={{
          modal: {
            background: getTheme(theme) ? theme.colors.dark[8] : "#d3d6e9"
          }
        }} onClose={() => setModalOpen(c => !c)}>
        {
          filterEventsOnDate()?.map((c, i) => (
            <Paper key={`event_${c.id}`} mb="xs" radius="md" sx={{
              background: getTheme(theme) ? theme.colors.dark[6] : theme.colors.gray[0],
              overflow: "hidden"
            }}>
              <Group align="center" position='apart'>
                <Group spacing={0}>
                  <ActionIcon size={60}>
                    <IconCalendar />
                  </ActionIcon>
                  <Stack spacing={0}>
                    <Title order={3} className={classes.text} weight={500}>{c.title}</Title>
                    <Text size="xs" className={classes.text}>{c?.token}</Text>
                    <Text size="sm" className={classes.text}>{new Date(c.date).toDateString()}</Text>
                  </Stack>
                </Group>
                <Anchor component={Link} to={`/events/${c.id}/`}>
                  <ActionIcon radius="lg" size={60} sx={{
                    ":hover": {
                      background: theme.colors.indigo[6],
                      color: "white"
                    }
                  }}>
                    <IconChevronRight size={32} />
                  </ActionIcon>
                </Anchor>
              </Group>
            </Paper>
          ))
        }
      </Modal>
      <Calendar
        value={date_}
        onChange={() => { }}
        fullWidth={true}
        allowLevelChange={allowdatechange}
        month={allowdatechange ? undefined : new Date()}
        onMonthChange={setDate}
        onDayMouseEnter={(date, event) => {
          if (days.includes(date.getDate())) {
            setTargetDate(date)
            setModalOpen(true)
          }
        }}
        styles={(theme) => (custom ? {
          cell: {
            border: `1px solid ${getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[2]}`,
            borderRadius: theme.radius.lg
          },
          day: { borderRadius: 10, height: 70, fontSize: theme.fontSizes.lg },
          weekday: { fontSize: theme.fontSizes.lg },
          weekdayCell: {
            fontSize: theme.fontSizes.xl,
            backgroundColor: getTheme(theme) ? theme.colors.dark[5] : theme.colors.gray[0],
            border: `1px solid ${getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[2]
              }`,
            height: 70,
          },
        } : {
          calendarHeaderControl: {
            display: "none"
          }
        })}
        renderDay={(date) => {
          const day = date.getDate();
          return (
            <Indicator size={6} color="indigo" offset={8} disabled={!days?.includes(day)}>
              <div>{day}</div>
            </Indicator>
          );
        }}
      />
    </Paper>
  );
}